import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { onLoad } from "../../store/userSlice";
import { useNavigation } from "expo-router";

const OnLoad = () => {
    
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    useEffect(() => {
      console.log("on mount, on mount", navigation.isReady())
      if(navigation.isReady()) dispatch(onLoad())
    //   dispatch(onLoad())
    }, [navigation.isReady()])
    return <></>
}

export default OnLoad;