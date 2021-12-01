import {
  mount, flushPromises,
} from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import Home from '@/views/Home.vue';
import BigLottery from '@/views/BigLottery.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/BigLottery',
    name: 'BigLottery',
    component: BigLottery,
  },
  ],
});

describe('Home', () => {
  test('origin route', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.html()).toContain('樂透');

    // await wrapper.find('a').trigger('click');
    //  expect(wrapper.html()).toContain('Testing Vue Router');
  });
  test('home to bigLottery', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    wrapper.findAllComponents({ name: 'router-link' })[0].trigger('click');
    await flushPromises();
    expect(wrapper.html()).toContain('<h2 class="pb-2 border-bottom">大樂透</h2>');
  });
  //   const router = new VueRouter({
  //     mode: 'history',
  //     routes,
  //   });
  //   const wrapper = mount(App, { localVue, router });

//   it('route path: /, component: Home', async () => {
//     router.push('/');
//     await wrapper.vm.$nextTick();
//     expect(wrapper.find(Home).exists()).toBe(true);
//   });
//   it('route path: /about, component: About', async () => {
//     router.push('/about');
//     await wrapper.vm.$nextTick();
//     expect(wrapper.find(About).exists()).toBe(true);
//   });
});
