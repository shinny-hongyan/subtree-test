<template>
  <div id="app">
    <!--<div id="nav">-->
        <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/home">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
      <router-view/>
  </div>
</template>

<style lang="scss">
    html, body {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #4a4a4a;
        font-size: 12px;
        height: 100%!important;
        overflow: hidden;
    }

    #app {
        width: 100%;
        height: 100%;
        position: relative;
    }

    #nav {
      padding: 30px;

      a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
          color: #42b983;
        }
      }
    }
</style>
