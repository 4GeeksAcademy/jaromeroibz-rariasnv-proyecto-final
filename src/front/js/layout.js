import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { SignupAsPetitioner } from "./pages/signupAsPetitioner";
import { RegisteredPetitioners} from "./pages/registeredPetitioners"
import { RegisteredPetitionerDetail} from "./pages/registeredPetitionerDetail"
import { EditPetitioner } from "./pages/editPetitioner";
import { SignInAsPetitioner} from "./pages/signInAsPetitioner"
import { RegisteredOfferers } from "./pages/registeredOfferers";
import { RegisteredOffererDetail } from "./pages/registeredOffererDetail";
import { SignUpAsOfferer } from "./pages/signUpAsOfferer";
import { EditOfferer } from "./pages/editOfferer";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { AddressList } from "./component/addressList";
import { AddressForm } from "./component/addressForm";
import { EditAddress } from "./component/editaddress";
import { Address } from "./component/address";
import { Service } from "./component/service";
import { ServiceForm } from "./component/serviceForm";
import { ServiceList } from "./component/serviceList";
import { EditService } from "./component/editService";
import { Signin } from "./component/signin";
import { SigninOfferer } from "./component/signinofferer";
import { ServiceListOfferer } from "./component/servicelistofferer";
import { Signup } from "./component/signup";
import { SignupOfferer } from "./component/signupofferer";
import {ApplytoService} from "./component/applytoservice";
import { ServiceConfirmation } from "./component/serviceconfirmation";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Address />} path="/address/:theid" />
                        <Route element={<AddressList />} path="/addresslist" />
                        <Route element={<AddressForm />} path="/addressform" />
                        <Route element={<EditAddress />} path="/editaddress/:editid" />
                        <Route element={<Service />} path="/service/:theid" />
                        <Route element={<ServiceList />} path="/servicelist" />
                        <Route element={<ServiceForm />} path="/serviceform" />
                        <Route element={<EditService />} path="/editservice/:editid" />
                        <Route element={<Signin />} path="/signin" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<SigninOfferer />} path="/signinofferer" />
                        <Route element={<SignupOfferer />} path="/signupofferer" />
                        <Route element={<ServiceListOfferer />} path="/servicelistofferer" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<SignupAsPetitioner />} path="/signUpAsPetitioner" />
                        <Route element={<RegisteredPetitioners />} path="/registeredPetitioners" />
                        <Route element={<RegisteredPetitionerDetail />} path="/registeredPetitioners/:theId" />
                        <Route element={<EditPetitioner />} path="/editPetitioner/:idToEdit" />
                        <Route element={<SignInAsPetitioner />} path="/signInAsPetitioner" />
                        <Route element={<RegisteredOfferers />} path="/registeredOfferers" />
                        <Route element={<RegisteredOffererDetail />} path="/registeredOfferers/:offererId" />
                        <Route element={<SignUpAsOfferer />} path="/signUpAsOfferer" />
                        <Route element={<EditOfferer />} path="/editOfferer/:offererIdToEdit" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<ApplytoService />} path="/applytoservice" />
                        <Route element={<ServiceConfirmation />} path="/serviceconfirmation/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer/>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
