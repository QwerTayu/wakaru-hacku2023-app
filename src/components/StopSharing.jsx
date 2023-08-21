import { col } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

const StopSharing = (users) => {
    const nowTime = new Date();
    // 受け取ったusersをmap()を使って展開する。
    // その中で、isInOfficeがtrueかつ(outTimeHourがnowTimeHourより小さいか、outTimeHourがnowTimeHourと同じでoutTimeMinuteがnowTimeMinuteより小さい)場合、isInOfficeをfalseにする。
    users.map((user) => {
        if  (
                user.isInOffice 
            && 
                (
                    user.outTimeHour < nowTime.getHours() 
                || 
                    (
                        user.outTimeHour === nowTime.getHours() 
                    && 
                        user.outTimeMinute < nowTime.getMinutes()
                    )
                )
            ) {
            // mapで現在展開しているuserのドキュメントidを取得する。
            // そのidを使って、isInOfficeをfalseにする。
            const docRef = doc(col, user.id);
            updateDoc(docRef, {isInOffice: false});


            console.log(user);
            console.log("done:", user.isInOffice, user);
        }
    }); 
}

export default StopSharing;
