import {RecoilState, RecoilValue, SetterOrUpdater, useRecoilSnapshot, useRecoilState, useRecoilValue} from "recoil";
import {useEffect, useState} from "react";

function useComponentDidMount() {
    const [componentDidMount, setComponentDidMount] = useState(false);
    useEffect(() => {
        setComponentDidMount(true);
    }, []);

    return componentDidMount;
}

export function useRecoilValueAfterMount<T>(
    recoilValue: RecoilValue<T>,
    valueBeforeMount: T,
) {
    const didMount = useComponentDidMount();
    const realValue = useRecoilValue(recoilValue);

    return didMount ? realValue : valueBeforeMount;
}

export function useRecoilStateAfterMount<T>(
    recoilValue: RecoilState<T>,
    valueBeforeMount: T,
) {
    const didMount = useComponentDidMount();
    const state = useRecoilState(recoilValue);

    const def: SetterOrUpdater<any> = (_: ((currVal: T) => T) | T) => {
    }
    return didMount ? ([...state, recoilValue.key] as [T, SetterOrUpdater<T>, string]) : ([valueBeforeMount, def] as [T, SetterOrUpdater<T>, string?]);
}
