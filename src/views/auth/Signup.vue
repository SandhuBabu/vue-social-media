<script setup>
import { ref } from "vue";
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {auth} from '@/firebase/config'
import {useRouter} from 'vue-router'

const router = useRouter();
const form = ref({
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const error = ref('')
const showPassword = ref(false);

const handleSubmit = async () => {
    try {
        await createUserWithEmailAndPassword(
            auth, 
            form.value.email,
            form.value.password
        )
        await updateProfile(auth.currentUser, {
            displayName: form.value.displayName
        })
        router.push({name:'home'})
    } catch (err) {
        console.log(err.code);
        if(err.code === 'auth/email-already-in-use')
            return error.value = "Email is already in use, try another or login"
        if(err.code === 'auth/invalid-email')
            return error.value = 'Invalid email address'
        error.value = "Failed to register"        
    }
};


const validate = () => {
    error.value = ''
    
    if(form.value.password != form.value.confirmPassword)
        return error.value = "password and confirm password should match"

    if (form.value.password.length < 6)
        return error.value = "password must contain atleast 6 characters"

    handleSubmit()
};
</script>

<template>
    <form @submit.prevent="validate">
    <h2 class="text-center mb-5">Register Now</h2>

    <div class="form-floating mt-3">
      <input 
        type="text" 
        v-model="form.displayName" 
        class="form-control"
        required
     />
      <label for="floatingInput">Name</label>
    </div>

    <div class="form-floating mt-3">
      <input
        type="email"
        v-model="form.email"
        class="form-control"
        style="text-transform: lowercase"
        required
      />
      <label for="floatingInput">Email address</label>
    </div>

    <div class="form-floating mt-3">
      <input
        :type="showPassword ? 'text' : 'password'"
        v-model="form.password"
        class="form-control"
        required
      />
      <label for="floatingPassword">Password</label>
      <i
        class="bi bi-eye-slash"
        :class="showPassword && 'bi-eye'"
        @click="showPassword = !showPassword"
      ></i>
    </div>

    <div class="form-floating mt-3">
      <input
        :type="showPassword ? 'text' : 'password'"
        v-model="form.confirmPassword"
        class="form-control"
        required
      />
      <label for="floatingPassword">Confirm Password</label>
      <i
        class="bi bi-eye-slash"
        :class="showPassword && 'bi-eye'"
        @click="showPassword = !showPassword"
      ></i>
    </div>

    <p class="text-danger fs-6">{{error}}</p>
    
    <button class="input-group btn btn-primary my-4">
        Register
    </button>

    <p>
      <span>Already registered?</span>
      <router-link :to="{ name: 'login' }">
        login
      </router-link>
    </p>
  </form>
</template>

<style>
input[type="password"] {
  padding-right: 2em;
}

.bi.bi-eye-slash {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  cursor: pointer;
}
</style>
