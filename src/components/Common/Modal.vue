<script setup>
const emit = defineEmits(['cancel'])
defineProps({
    fullHeight: {
        type: Boolean,
        required: false
    },
    fullWidth: {
        type: Boolean,
        required: false
    },
    scrollable: {
        type: Boolean,
        required: false
    }
})
</script>

<template>
    <div class="popup-container">
        <div class="custom-modal shadow rounded" :class="{
            fullheight: fullHeight,
            fullWidth: fullWidth,
            scrollablebody: scrollable
        }">
            <div class="d-flex justify-content-between">
                <h5>
                    <slot name="title" />
                </h5>
                <i class="bi bi-x-lg" style="cursor: pointer;" @click="$emit('cancel')"></i>
            </div>
            <div class="mt-2">
                <slot name="body" />
            </div>
            <div class="d-flex justify-content-end flex-wrap gap-3">
                <slot name="action" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.popup-container {
    width: 100%;
    min-height: 100vh;
    background-color: var(--backdrop-bg);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    display: grid;
    place-items: center;

    .custom-modal {
        min-width: 25em;
        max-width: 35em;
        min-height: 10em;
        padding: 15px;
        background-color: var(--white);

        &.fullheight {
            height: 100vh;
        }

        &.fullWidth {
            min-width: 100%;
        }

        &.scrollablebody {
            overflow-y: scroll;
        }


        @media (width <=771px) {
            width: 90%;

            &.fullwidth {
                width: 100%;
            }
        }
    }
}
</style>