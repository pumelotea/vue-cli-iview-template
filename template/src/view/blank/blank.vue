<template>
  <div>
    我是一张空白页
    <a @click="add">添加一个路由</a>
    <div>
      <pre>
        \{{route}}
      </pre>
    </div>
  </div>
</template>

<script>
  export default {
    name: "blank",
    data () {
      return {
        route: {
          path: '/dy',
          name: 'dy',
          meta: {
            hideInBread: false,
            title: '动态路由'
          },
          component: () => import('@/components/main'),
          children: [
            {
              path: 'dy-route',
              name: '动态路由演示',
              meta: {
                icon: 'ios-navigate',
                title: '动态路由演示'
              },
              component: () => import('@/view/blank/blank.vue')
            }
          ]
        }
      }
    },
    methods: {
      add () {
        this.$router.addDyRoute(this.route)
      }
    }
  }
</script>

<style scoped>

</style>
