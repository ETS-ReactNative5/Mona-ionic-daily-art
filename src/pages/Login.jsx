import {
  IonContent,
  IonImg,
  IonCard,
  IonHeader,
  IonPage,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
} from "@ionic/react";
import "./Login.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseInit";
import { hideTabs } from "../App";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    hideTabs();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        history.replace("/daily");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <IonPage id="login-page">
      <IonContent className="page-content" fullscreen>
        <IonImg className="login-bg-img" src="assets/Images/Mona-lisa.jpg" />
        <IonCard className="login-card" color="custom-dark">
          <IonHeader className="login-header">Welcome back</IonHeader>
          <form className="login-form" onSubmit={handleSubmit}>
            <IonItem color="custom-dark" className="login-item">
              <IonInput
                value={mail}
                type="email"
                placeholder="Type your mail"
                onIonChange={(e) => setMail(e.target.value)}
              />
            </IonItem>
            <IonItem color="custom-dark" className="login-item">
              <IonInput
                value={password}
                type="password"
                placeholder="Type your password"
                onIonChange={(e) => setPassword(e.target.value)}
              />
            </IonItem>
            <div className="ion-padding">
              <IonButton color="custom-orange" expand="block" className="login-button" type="submit">
                Login
              </IonButton>
            </div>
            <div className="ion-text-center">
              <IonButton size="small" fill="clear" onClick={() => history.replace("/signup")}>
                Not a member?&nbsp;<span className="create-account-text">Create an account</span>
              </IonButton>
            </div>
          </form>{" "}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;