<template>
  <div id="app">
    <div class="main-menu">
      <router-link to="/">Home</router-link>
      <router-link to="page">PageViews</router-link>
      <router-link to="cta">Eventos</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'URLinfo'
}
</script>

<style>

a{
  color: #B0B0B0;
}

a.router-link-exact-active {
  color: #FFF;
}

body {
  color: #FAFAFF;
  background-color: #1E1E1E;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-menu {
  text-align:left;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 40px;
  width: 100%;
  background: #333333;
  padding: 8px;
}

.main-menu a {
  text-decoration: none;
  display: inline-block;
  margin: 8px 12px;
}

.container {margin-top: 48px; padding:10px;}

.pattern_plus {
  background-color:#060;
}

.pattern_minus {
  background-color:#600;
}

.flex_pattern {
  margin-top:20px;
}

.match, .match_negative {color: #AFA;}
.match_negative{color: #FFA;}

input {margin:0px auto; width:100%; padding:4px; border:1px solid #CCC;}


</style>
