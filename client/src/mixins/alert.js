export default {
    data() {
        return {
            alertData: {
                visible: false,
                title: '',
                type: '',
                text: ''
            }
        }
    },
    methods: {
        setErrorAlert() {
            this.alertData = {
                visible: true,
                title: 'Error Happen',
                type: 'error',
                text: 'Error happan, please tet again, or contact support'
            }
        },
        setSuccessAlert({text, title}) {
            this.alertData = {
                visible: true,
                title,
                type: 'success',
                text
            }
        }
    }
}