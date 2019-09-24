// (C) 2019 GoodData Corporation
import React from "react";
import { DataViewFacade, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { withExecution } from "./withExecution";
import { WithLoadingResult } from "../base/hoc/withLoading";

export interface IExecutorProps {
    children: (executionResult: WithLoadingResult<DataViewFacade>) => React.ReactElement<any> | null;
    execution: IPreparedExecution;
    onError?: (error?: Error, props?: IExecutorProps) => void;
    onLoadingStart?: (props?: IExecutorProps) => void;
    onLoadingChanged?: (isLoading?: boolean, props?: IExecutorProps) => void;
    onLoadingFinish?: (result?: DataViewFacade, props?: IExecutorProps) => void;
}

type Props = IExecutorProps & WithLoadingResult<DataViewFacade>;

const CoreExecutor: React.StatelessComponent<Props> = ({ children, error, isLoading, fetch, result }) => {
    return children({
        error,
        isLoading,
        fetch,
        result,
    });
};

export const Executor = withExecution({
    executionOrFactory: (props: IExecutorProps) => props.execution,
    mapResultToProps: r => r,
    eventsOrFactory: props => {
        const { onError, onLoadingChanged, onLoadingFinish, onLoadingStart } = props;
        return {
            onError,
            onLoadingChanged,
            onLoadingFinish,
            onLoadingStart,
        };
    },
})(CoreExecutor);
