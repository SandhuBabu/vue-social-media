<script setup>
import { ref } from "vue";
import { auth } from '@/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter();
const error = ref('')
const form = ref({
    email: "",
    password: "",
});

const showPassword = ref(false);

const handleLogin = async () => {
    if (form.value.password.length < 6)
        return error.value = "Password must contain 6 characters"

    try {
        await signInWithEmailAndPassword(
            auth,
            form.value.email,
            form.value.password
        )
        router.push({ name: 'home' })
    } catch (err) {
        if (err.code === 'auth/invalid-credential')
            return error.value = "Invalid credentials"
        return error.value = "Failed to login"
    }
}
</script>

<template>
    <form @submit.prevent="handleLogin">
        <h2 class="text-center mb-5">Login Now</h2>
        <div class="form-floating mb-3">
            <input type="email" v-model="form.email" class="form-control" style="text-transform: lowercase" required />
            <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
            <input :type="showPassword ? 'text' : 'password'" v-model="form.password" class="form-control" required />
            <label for="floatingPassword">Password</label>
            <i class="bi bi-eye-slash" :class="showPassword && 'bi-eye'" @click="showPassword = !showPassword"></i>
        </div>

        <p class="text-danger fs-6">{{ error }}</p>

        <button class="input-group btn btn-primary my-4">Login</button>

        <p>
            <span>Not registered?</span>
            <router-link :to="{ name: 'signup' }">
                Register
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
