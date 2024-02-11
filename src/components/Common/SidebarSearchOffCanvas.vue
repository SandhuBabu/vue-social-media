<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import { searchUsers } from '@/firebase/userService';
import defaultProfilePicture from '../../assets/images/default_profile_picture.jpg'

const router = useRouter()
const searResults = ref(null)
const text = ref(null)

const handleSearch = async () => {
    const res = await searchUsers(text.value)
    searResults.value = res;
}

const handleGoToUserProfile = (uid) => {
    document.querySelector('#btn-close').click()
    text.value = null
    searResults.value = null
    router.push({name: 'user', params: {userUid:uid}})
} 
</script>

<template>
    <div class="offcanvas offcanvas-start canvas" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Search</h5>
        <button type="button" id="btn-close" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="row">
            <div class="col-12">
                <div class="input-group mb-3">
                    <div class="form-floating">
                        <input 
                            type="text" 
                            class="form-control"  
                            placeholder="Username"
                            v-model.trim="text"
                            @change="handleSearch"    
                        />
                        <label for="floatingInputGroup1">Search...</label>
                    </div>
                </div>
            </div>
        </div>

        <p v-if=" searResults?.length === 0">No search results found.</p>

        <!-- list for search results -->
        <ul class="row p-0 ps-2">
            <li 
                v-for="(user, i) in searResults"
                :key="i"
                class="col-12 rounded border-bottom d-flex align-items-center gap-2 py-2"
                @click="handleGoToUserProfile(user.uid)"
            >
                <img 
                    :src="user.photoURL?? defaultProfilePicture" 
                    alt=""
                    class="rounded-circle"
                    style="width: 2.25em; height: 2.25em; object-fit: cover;"
                />
                <div class="d-flex flex-column">
                    <p>{{ user.displayName }}</p>
                    <span 
                        style="font-size: 13px; font-weight: var(--font-light); margin-top: -3px;"
                    >{{ user.email }}</span>
                </div>
            </li>
        </ul>
      </div>
    </div>
</template>

<style lang="scss" scoped>
ul {
    li{
        cursor: pointer;
        transition: background-color 300ms;
        
        &:hover {
            background-color: var(--white-hover);
        } 
        
        a{
            color: var(--text-c2);
            text-decoration: none;
        }
    }
}

.canvas {
    @media (width < 771px) {
        width: 100%;
    }
}
</style>