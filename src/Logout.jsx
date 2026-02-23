import { useJwt } from "./UserStore";
import { Redirect } from "wouter";

export default function Logout() {

    const { clearJwt } = useJwt();
    clearJwt();

    return <Redirect to="/login"/>
}