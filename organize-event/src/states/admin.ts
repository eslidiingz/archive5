import { useState, useEffect } from "react";
import { atom, useRecoilState } from "recoil";

import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const ColorMode = atom({
  key: "ColorMode",
  default: "light",
  effects_UNSTABLE: [persistAtom],
});

// import จากอันนี้แทนเพราะมันจะพังตอนฝั่ง server เริ่มรันเพราะมันหา localStorage ไม่เจอ
export function useColorMode() {
  const [isInitial, setIsInitial] = useState(true);
  const [colorModeStored, setColorModeStored] = useRecoilState(ColorMode);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial === true ? false : colorModeStored, setColorModeStored];
}

export const MY_EVENT_STATE: any = atom<any>({
  key: "MY_EVENT_STATE",
  default: "",
});

export const EVENT_SELECTED_STATE: any = atom<any>({
  key: "EVENT_SELECTED_STATE",
  default: "",
});

export const FORM_REGISTER_STATE: any = atom<any>({
  key: "FORM_REGISTER_STATE",
  default: {
    topic: "",
    description: "",
    require: "",
    start_date: "",
    end_date: "",
    event_uid: "",
  },
});

export const FORM_REGISTER_UID: any = atom<any>({
  key: "FORM_REGISTER_UID",
  default: "",
});

export const FORM_REGISTER_QUESTION_STATE: any = atom<any>({
  key: "FORM_REGISTER_QUESTION_STATE",
  default: [],
});
