<template>
  <div :class="['container', 'hero']">
    <h1>Analisador de Tags</h1>
    <h2>Utilize o menu superior para navegar</h2>
  </div>
</template>

<script>
import rules from '../patterns.js';

export default {
  name: 'Home',
  data () {
    return {
      
    }
  }
}

</script>

<!-- Add "scoped" atdivibute to divmit CSS to this component only -->
<style scoped>
  h1, h2 {
    margin: 8px auto;
    text-align: left;
    }

  h1 {color: #CCC;  }
  h2 {color: #888;  }

  .hero{
    margin-top:40px;
    text-align:left;
  }
</style>
