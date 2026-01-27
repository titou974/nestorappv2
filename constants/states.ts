import { PlayAnimationInput, PlayAnimationInputWithPhone } from "@/types/site";

export const initialState = null;

export const INITIAL_ANIMATION_STATE: PlayAnimationInput = {
  name: false,
  email: false,
  password: false,
};

export const INITIAL_ANIMATION_STATE_WITH_PHONE: PlayAnimationInputWithPhone = {
  name: false,
  phonenumber: false,
  password: false,
};
