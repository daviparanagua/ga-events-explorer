<template>
  <div :class="['container']">
    <div :class="['main', pageClass]">
      <input id="url_input" type="text" v-model="url" v-on:keyup="getPageName" placeholder="Digite uma URL" autocomplete="off" /> <br />
      <div class="page_name">
        {{pageNameMessage}}
      </div>
    </div>
    <div class="page_info">
      <div class="result" v-for="pageInfo in pageInfos" :key="pageInfo.id">
        <div class="file_source">{{pageInfo.origem}} | {{pageInfo.id}}</div>
        <div class="result-header">
          <div class="to_right" v-if="pageInfo.etapa != ''">{{pageInfo.etapa}}</div>
          <div class="to_left" v-if="pageInfo.pagina != ''">{{pageInfo.pagina}}</div>
        </div>
        <div>
          <div class="tag" v-if="pageInfo.segmento != ''">{{pageInfo.segmento}} <div class="tag_title">Segmento</div></div>
          <div class="tag" v-if="pageInfo.produto != ''">{{pageInfo.produto}} <div class="tag_title">Produto</div></div>
          <div class="tag" v-if="pageInfo.canal != ''">{{pageInfo.canal}} <div class="tag_title">Canal</div></div>
          <div class="tag" v-if="pageInfo.tipo != ''"> {{pageInfo.tipo}} <div class="tag_title">Tipo</div></div>
          <div class="tag" v-if="pageInfo.fluxo != ''">{{pageInfo.fluxo}} <div class="tag_title">Fluxo</div></div>
        </div>
        <div class="result-footer">
          <div class="pattern_plus" v-if="pageInfo.pattern != ''">➕ {{pageInfo.pattern}} <br /><span class="match">{{ url.match(pageInfo.pattern)}}</span></div>
          <div class="pattern_minus" v-if="pageInfo.negativepattern != ''">➖ {{pageInfo.negativepattern}} </div>
        </div>
      </div>
    </div>
    <div :class="{'flex_pattern': true, 'found': flexPattern && flexPatternMatch, 'not-found': flexPattern && !flexPatternMatch }">
      <h2>Testar padrão</h2>
      <table><tr><td>
      <input type="text" v-model="flexPattern" v-on:keyup="getPageName" placeholder="Digite um padrão personalizado" autocomplete="off" />
      </td><td>
      <input type="text" v-model="flexPatternNegative" v-on:keyup="getPageName" placeholder="Digite um padrão personalizado negativo" autocomplete="off" />
      </td></tr><tr><td>
      <span v-if="url.match(flexPattern)" class="match">{{ url.match(flexPattern)[0] }}</span>
      </td><td>
      <span v-if="url.match(flexPatternNegative)" class="match_negative">{{ url.match(flexPatternNegative)[0] }}</span>
      </td></tr></table>
      <div v-if="flexPattern">
        <div v-if="flexPatternMatch">Corresponde</div>
        <div v-else>Não corresponde</div>
      </div>
    </div>
  </div>
</template>

<script>
import rules from '../patterns.js';

export default {
  name: 'Page',
  data () {
    return {
      url: 'www.oi.com.br/celular-pos-pago',
      pageInfos: {},
      flexPattern: '',
      flexPatternNegative: ''
    }
  },
  computed: {
    pageClass: function(){
      if(this.pageInfos.length == 1){
        return 'found'; 
      } else if(this.pageInfos.length > 1){
        return 'multiple';
      } else {
        return 'not-found';
      }
    },
    pageNameMessage: function(){
      if (this.url == ''){
        return 'Digite uma URL no campo acima'
      } else if(this.pageClass == 'found'){
        return 'Esta URL é ' +  this.pageInfos[0].etapa + ' de ' +  this.pageInfos[0].pagina;
      } else if(this.pageClass == 'multiple'){
        return 'Esta URL atende a ' +  this.pageInfos.length + ' critérios simultaneamente';
      } else {
        return 'Não foi localizada uma classificação para esta página';
      }
    },
    flexPatternMatch: function(){
      return new RegExp(this.flexPattern).test(this.pagePathFiltered) && (!this.flexPatternNegative || !(new RegExp(this.flexPatternNegative).test(this.pagePathFiltered)));
    },
    pagePathFiltered: function(){
      let pagePath = this.url.replace('www.oi.com.br','');
      pagePath = pagePath.replace('https://','');
      return pagePath;
    }
  },
  mounted: function(){
    this.url = localStorage.getItem('page_url') || '';
    this.flexPattern = localStorage.getItem('page_flex_pattern') || '';
    this.flexPatternNegative = localStorage.getItem('page_flex_pattern_negative') || '';
    this.getPageName();
  },
  methods: {
    getPageName: function(){
      localStorage.setItem('page_url',this.url);
      localStorage.setItem('page_flex_pattern',this.flexPattern);
      localStorage.setItem('page_flex_pattern_negative',this.flexPatternNegative);
      this.pageInfos = [];

      for(let rule of rules){
        if(new RegExp(rule.pattern).test(this.pagePathFiltered) && (rule.negativepattern == '' || !(new RegExp(rule.negativepattern).test(this.pagePathFiltered)))){
          this.pageInfos.push(rule);
        }
      }
    }
  }
}

</script>

<!-- Add "scoped" atdivibute to divmit CSS to this component only -->
<style>
  h1 {text-align:center; color: #666; font-weight: 300;}
  
  .main {text-align:center; border-bottom:1px sodivd #CCC;}
  .test_item {text-align: left;}
  .page_name {margin:16px; font-weight: bold;}

  .found input {border-color: #0A0; background-color: #060;}
  .not-found input {border-color: #FA0; background-color: #660;}
  .multiple input {border-color: #E00; background-color: #600;}

  .tag {display:inline-block; margin:8px 30px 8px 0; min-width: 70px;}
  .tag_title {font-size: 65%; color: #AAA;}

  .to_left, .to_right {width: 50%;}

  .to_right {float:right;}

  .file_source {
    font-size:60%;
  }

  .result {
    margin: 4px auto;
    padding:3px 8px;
    border-bottom: 1px solid #CCC;
  }

  .result-header {
    font-weight: bold;
    padding: 4px 0 8px 0;
  }

  .result-header .to_left{
    font-size: 95%; 
  }

  .result-header .to_right{
    font-size: 80%;
  }

  .result-footer {
    padding-top:6px;
    font-size: 70%;
  }

  table {
    width:100%;
  }
</style>
