<template>
  <div :class="['container', pageClass]">
    <div class="main">
      <table class="full-table">
        <tr>
          <td><input id="category_input" type="text" v-model="category" v-on:keyup="getPageName" placeholder="Categoria do evento" autocomplete="off" /></td>
          <td><input id="action_input" type="text" v-model="action" v-on:keyup="getPageName" placeholder="Ação do evento" autocomplete="off" /></td>
          <td><input id="label_input" type="text" v-model="label" v-on:keyup="getPageName" placeholder="Rótulo do evento" autocomplete="off" /></td>
        </tr>
      </table>
      <div class="page_name">
        {{pageNameMessage}}
      </div>
    </div>
    <hr />
    <div class="page_info">
      <div class="result" v-for="pageInfo in pageInfos" :key="pageInfo.id">
        <div class="file_source">{{pageInfo.source}} | {{pageInfo.id}}</div>
        <div class="result-header">
          <div class="to_right" v-if="pageInfo.etapa != ''">{{pageInfo.etapa}}</div>
          <div class="to_left" v-if="pageInfo.pagina != ''">{{pageInfo.pagina}}</div>
        </div>
        <div>
          <div class="tag" v-if="pageInfo.segmento != ''">{{pageInfo.segmento}} <div class="tag_title">Segmento</div></div>
          <div class="tag" v-if="pageInfo.produto != ''">{{pageInfo.produto}} <div class="tag_title">Produto</div></div>
          <div class="tag" v-if="pageInfo.cta != ''"> {{pageInfo.cta}} <div class="tag_title">CTA</div></div>
          <div class="tag" v-if="pageInfo.canal != ''">{{pageInfo.canal}} <div class="tag_title">Canal</div></div>
          <div class="tag" v-if="pageInfo.tipo != ''"> {{pageInfo.tipo}} <div class="tag_title">Tipo</div></div>
          <div class="tag" v-if="pageInfo.fluxo != ''">{{pageInfo.fluxo}} <div class="tag_title">Fluxo</div></div>
        </div>
        <div class="result-footer">
          <table>
            <tr>
                <th>Categoria</th>
                <th>Ação</th>
                <th>Rótulo</th>
            </tr>
            <tr>
                <td class="pattern_plus"><span v-if="pageInfo.category_pattern != ''">➕ {{pageInfo.category_pattern}}</span></td>
                <td class="pattern_plus"><span v-if="pageInfo.action_pattern != ''">➕ {{pageInfo.action_pattern}}</span></td>
                <td class="pattern_plus"><span v-if="pageInfo.label_pattern != ''">➕ {{pageInfo.label_pattern}}</span></td>
            </tr>
            <tr v-if="pageInfo.category_negativepattern || pageInfo.action_negativepattern || pageInfo.label_negativepattern">
              <td class="pattern_minus">➖ {{pageInfo.category_negativepattern}}</td>
              <td class="pattern_minus">➖ {{pageInfo.action_negativepattern}}</td>
              <td class="pattern_minus">➖ {{pageInfo.label_negativepattern}}</td>
            </tr>
          </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import rules from '../patterns-cta.js';

export default {
  name: 'CTA',
  data () {
    return {
      ctaFullString: '',
      category: localStorage.getItem('cta_category') || '',
      action:  localStorage.getItem('cta_action') || '',
      label: localStorage.getItem('cta_label') || '',
      pageInfos: {},
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
        return 'Digite um evento no campo acima'
      } else if(this.pageClass == 'found'){
        return 'Este evento é ' +  this.pageInfos[0].etapa + ' de ' +  this.pageInfos[0].pagina;
      } else if(this.pageClass == 'multiple'){
        return 'Este evento atende a ' +  this.pageInfos.length + ' critérios simultaneamente';
      } else {
        return 'Não foi localizada uma classificação para este evento';
      }
    }
  },
  mounted: function(){
    this.category = localStorage.getItem('cta_category') || '';
    this.action = localStorage.getItem('cta_action') || '';
    this.label = localStorage.getItem('cta_label') || '';
    this.getPageName();
  },
  methods: {
    getPageName: function(){

      if(this.category.indexOf("\t") > -1){
        let fragments = this.category.trim().split("\t");
        if(fragments.length == 3){
          this.category = fragments[0];
          this.action = fragments[1];
          this.label = fragments[2];
          this.getPageName();
        }
      }

      localStorage.setItem('cta_category', this.category);
      localStorage.setItem('cta_action', this.action);
      localStorage.setItem('cta_label', this.label);
      this.pageInfos = [];

      for(let rule of rules){
        if(
          new RegExp(rule.category_pattern).test(this.category) && (rule.category_negativepattern == '' || !(new RegExp(rule.category_negativepattern).test(this.category)))
          && new RegExp(rule.action_pattern).test(this.action) && (rule.action_negativepattern == '' || !(new RegExp(rule.action_negativepattern).test(this.action)))
          && new RegExp(rule.label_pattern).test(this.label) && (rule.label_negativepattern == '' || !(new RegExp(rule.label_negativepattern).test(this.label)))
        ){
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
  th {
    font-weight: 400;
    text-align: left;
    font-size: 90%;
    color: #AAA;
  }

 
  
  .main {text-align:center; border-bottom:1px sodivd #CCC;}
  .test_item {text-align: left;}
  .page_name {margin:16px; font-weight: bold;}

  .one-third {width:33%; float: left;}

  .found input {border-color: #0A0; background-color: #AFA;}
  .not-found input {border-color: #FA0; background-color: #FFA;}
  .multiple input {border-color: #E00; background-color: #FDD;}

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

  .full-table {
    width:100%;
  }
</style>
