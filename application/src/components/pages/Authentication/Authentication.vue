<template>
  <div class="l-auth-container">
    <div class="l-auth">
      <v-form v-model="validLogin">
        <v-text-field label="Username"
                      v-model="credentials.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Password"
                      v-model="credentials.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (loginPasswordVisible = !loginPasswordVisible)"
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>

        <v-btn block flat color="light-blue lighten-1" @click.native="signUpVisible = true">Create Account</v-btn>
        <v-btn block color="light-blue lighten-1" @click.native="submitAuthentication()">Login</v-btn>
      </v-form>
    </div>

    <div class="l-signup" v-if="signUpVisible">
      <v-form v-model="validSignUp">
        <v-text-field label="Username"
                      v-model="newUser.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Password"
                      v-model="newUser.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (signUpPasswordVisible = !signUpPasswordVisible)"
                      :type="signUpPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>

        <v-btn block color="light-blue lighten-1" @click.native="submitSignUp()">Sign Up</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import Authentication from '@/components/pages/Authentication'  // Import Autnetication 'index.js' for methods within
export default {
  data() {
    return {
      snackbar: false,  // Used to display snackbar
      validLogin: false,  // Used to validate login form
      validSignUp: false, // Used to validate sign up form
      signUpVisible: false, // Used to render sign up form (if true)
      loginPasswordVisible: false,  // Used to show login password (if true)
      signUpPasswordVisible: false, // Used to show sign up password (if true)
      rules: [ (value) => !!value || 'This field is required' ],  // Rules for validating inputs
      credentials: {  // Object bound to login inputs for authentication
        username: '',
        password: ''
      },
      newUser: {  // Object bound to sign up inputs for authentication
        username: '',
        password: ''
      },
      message: '' // Used to render authentication messages
    }
  },
  methods: {
    submitAuthentication() {  // Call authenticate method from Authentication JS file
      Authentication.authenticate(this, this.credentials, '/')
    },
    submitSignUp() {  // Call authentication method from Authentication JD file
      Authentication.signup(this, this.newUser, '/')
    }
  }
}
</script>

<style lang="scss">
  @import "./../../../assets/styles";

  .l-auth {
    background-color: $background-color;
    padding: 15px;
    margin: 45px auto;
    min-width: 272px;
    max-width: 320px;
    animation: bounceIn 1s forwards ease;

    label, input, .icon {
      color: #29b6f6!important;
    }

    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }
  }

  .l-signup {
    @extend .l-auth;
    animation: slideInFromLeft 1s forwards ease;
  }
</style>
