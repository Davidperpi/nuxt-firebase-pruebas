import { db } from "@/plugins/firebase";

export const state = () => ({
    users: []
})

export const mutations = {
    onUsers(state) {
        try {
            var starCountRef = db.ref("users/");
            starCountRef.on("value", (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    state.users = data;
                    console.log(this.users);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}