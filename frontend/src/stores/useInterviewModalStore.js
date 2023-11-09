
import { defineStore } from 'pinia';

export const useInterviewModalStore = defineStore({
    id: 'modal',
    state: () => ({
        isOpen: false,
        content: null,
    }),
    actions: {
        openModal(content) {
            this.isOpen = true;
            this.content = content;
        },
        closeModal() {
            this.isOpen = false;
            this.content = null;
        },
    },
    getters: {
        getIsOpen: (state) => state.isOpen,
        getContent: (state) => state.content,
    },
});
