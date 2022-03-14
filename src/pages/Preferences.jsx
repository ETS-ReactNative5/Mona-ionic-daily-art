import {
  IonContent,
  IonHeader,
  IonPage,
  IonItem,
  IonInput,
  IonButton,
  IonImg,
  IonCard,
  IonCheckbox,
  IonToast,
} from "@ionic/react";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, app } from "../firebase/firebaseInit";
import { hideTabs, showTabs } from "../components/utilities";
import { addDoc, getDocs, setDoc } from "firebase/firestore";
import { usersRef } from "../firebase/firebaseInit";
import { getUserRef } from "../firebase/firebaseInit";

import "./Preferences.css";

export default function Preferences() {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [usersArray, setUsersArray] = useState([]);

  const [paintings, setPaintings] = useState(false);
  const [sculptures, setSculptures] = useState(false);
  const [photography, setPhotography] = useState(false);
  const [architecture, setArchitecture] = useState(false);
  const paintingsRef = useRef(null);
  const sculpturesRef = useRef(null);
  const photographyRef = useRef(null);
  const architectureRef = useRef(null);

  useEffect(async () => {
    hideTabs();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //when user signed in
        setUser(user);
      } else {
        // when user signed out
        history.replace("/login");
      }
    });

    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach(async (doc) => {
      const docData = await doc.data();

      usersArray.push(docData);
    });
    console.log(usersArray);
  }, []);

  async function handleSubmit() {}

  return (
    <IonPage className="posts-page">
      <IonContent fullscreen>
        <IonImg className="login-bg-img" src="assets/Images/Mona-lisa.jpg" />
        <IonCard className="signup-card" color="custom-dark">
          <IonHeader className="preferences-header">Choose your preferences</IonHeader>
          <form className="preferences-form" onSubmit={handleSubmit}>
            <div className="preferences-wrapper">
              <div
                className="preference-box"
                onClick={() => {
                  setPaintings(!paintings);
                  paintingsRef.current.classList.toggle("activated");
                }}
              >
                <div className="preference-card">
                  <IonImg
                    className="card-image"
                    src="assets/Images/preferences/preferences-image.png"
                    ref={paintingsRef}
                  />
                </div>
                <h4>Paintings</h4>
              </div>
            </div>
            <div className="ion-padding">
              <IonButton color="custom-orange" className="preferences-button" type="submit" expand="block">
                Confirm
              </IonButton>
            </div>
          </form>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
