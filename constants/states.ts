import {
  PlayAnimationInputLogin,
  PlayAnimationInputLoginWithPhone,
  PlayAnimationInputRegister,
  PlayAnimationInputRegisterWithPhone,
} from "@/types/site";

export const initialState = null;

export const INITIAL_ANIMATION_STATE_REGISTER: PlayAnimationInputRegister = {
  name: "",
  email: "",
  password: "",
};

export const INITIAL_ANIMATION_STATE_LOGIN: PlayAnimationInputLogin = {
  email: "",
  password: "",
};

export const INITIAL_ANIMATION_STATE_REGISTER_WITH_PHONE: PlayAnimationInputRegisterWithPhone =
  {
    name: "",
    phone: "",
    password: "",
  };

export const INITIAL_ANIMATION_STATE_LOGIN_WITH_PHONE: PlayAnimationInputLoginWithPhone =
  {
    phone: "",
    password: "",
  };
