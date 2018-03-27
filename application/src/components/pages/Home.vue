<template>
  <main class="l-home-page">
    <app-header :budgetsVisible="budgetsVisible"
      @toggleVisibleData="budgetsVisible = !budgetsVisible; budgetCreation = !budgetCreation"
      :selectState="selectState"
      :search="search"
      v-model="search">
    </app-header>

    <div class="l-home">
      <h4 class="white--text text-xs-center my-0">
        Focus Budget Manager
      </h4>

      <list v-if="listPage">
        <list-header slot="list-header" :headers="budgetsVisible ? budgetHeaders : clientHeaders"></list-header>
        <list-body slot="list-body"
                    :budgetsVisible="budgetsVisible"
                    :data="budgetsVisible ? budgets : clients"
                    :search="search"
                    :deleteItem="deleteItem"
                    :getBudget="getBudget"
                    :getClient="getClient"
                    :parsedBudgets="parsedBudgets">
        </list-body>
      </list>

      <create v-else-if="createPage"
        :budgetCreation="budgetCreation"
        :budgetEdit="budgetEdit"
        :editPage="editPage"
        :clients="clients"
        :budget="budget"
        :client="client"
        :saveBudget="saveBudget"
        :saveClient="saveClient"
        :fixClientNameAndUpdate="fixClientNameAndUpdate"
        :updateClient="updateClient">
      </create>
    </div>

    <v-snackbar :timeout="timeout"
                bottom="bottom"
                :color="snackColor"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>

    <v-fab-transition>
      <v-speed-dial v-model="fab"
                    bottom
                    right
                    fixed
                    direction="top"
                    transition="scale-transition">
          <v-btn slot="activator"
                 color="red lighten-1"
                 dark
                 fab
                 v-model="fab">
            <v-icon>add</v-icon>
            <v-icon>close</v-icon>
          </v-btn>

        <v-tooltip left>
          <v-btn color="light-blue lighten-1"
                  dark
                  small
                  fab
                  slot="activator"
                  @click.native="budgetCreation = true; listPage = false; editPage = false; createPage = true">
            <v-icon>assignment</v-icon>
          </v-btn>
          <span>Add new Budget</span>
        </v-tooltip>

        <v-tooltip left>
          <v-btn color="green lighten-1"
                  dark
                  small
                  fab
                  slot="activator"
                  @click.native="budgetCreation = false; listPage = false; editPage = false; createPage = true">
            <v-icon>account_circle</v-icon>
          </v-btn>
          <span>Add new Client</span>
        </v-tooltip>

        <v-tooltip left>
          <v-btn color="purple lighten-2"
                 dark
                 small
                 fab
                 slot="activator"
                 @click.native="budgetCreation = false; listPage = true; budgetsVisible = true">
            <v-icon>assessment</v-icon>
          </v-btn>
          <span>List Budgets</span>
        </v-tooltip>

        <v-tooltip left>
          <v-btn color="deep-orange lighten-2"
                 dark
                 small
                 fab
                 slot="activator"
                 @click.native="budgetCreation = false; listPage = true; budgetsVisible = false">
            <v-icon>supervisor_account</v-icon>
          </v-btn>
          <span>List Clients</span>
        </v-tooltip>
      </v-speed-dial>
    </v-fab-transition>
  </main>
</template>

<script>
import Axios from 'axios'
import Authentication from '@/components/pages/Authentication'
import ListHeader from './../List/ListHeader'
import ListBody from './../List/ListBody'

const BudgetManagerAPI = `http://${window.location.hostname}:3001`

export default {
  components: {
    'list-header': ListHeader,
    'list-body': ListBody
  },
  data () {
    return {
      budgets: [],
      clients: [],
      budgetHeaders: ['Client', 'Title', 'Status', 'Actions'],
      clientHeaders: ['Client', 'Email', 'Phone', 'Actions'],
      budgetsVisible: true,
      snackbar: false,
      timeout: 6000,
      message: '',
      fab: false
    }
  },
  mounted () {
    this.getAllBudgets()
    this.getAllClients()
    this.hidden = false
  },
  methods: {
    getAllBudgets () {
      Axios.get(`${BudgetManagerAPI}/api/v1/budget`, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: { user_id: this.$cookie.get('user_id') }
      }).then(({data}) => {
        this.budgets = this.dataParser(data, '_id', 'client', 'title', 'state')
      }).catch(error => {
        this.snackbar = true
        this.message = error.message
      })
    },

    getAllClients () {
      Axios.get(`${BudgetManagerAPI}/api/v1/client`, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: { user_id: this.$cookie.get('user_id') }
      }).then(({data}) => {
        this.clients = this.dataParser(data, '_id', 'client', 'email', 'phone')
      }).catch(error => {
        this.snackbar = true
        this.message = error.message
      })
    },

    dataParser (targetedArray, ...options) {
      let parsedData = []
      targetedArray.forEach(item => {
        let parsedItem = {}
        options.forEach(option => (parsedItem[option] = item[option]))
        parsedData.push(parsedItem)
      })
      return parsedData
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./../../assets/styles";

  .l-home {
    background-color: $background-color;
    margin: 25px auto;
    padding: 15px;
    min-width: 272px;
  }
</style>
