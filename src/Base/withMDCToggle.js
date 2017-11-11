// @flow
import * as React from 'react';
import { withMDC } from './withMDC';

type WithMDCToggleOptsT = {
  mdcConstructor?: Function
};

type WithMDCTogglePropsT = {
  id: string,
  disabled: boolean,
  checked: boolean | string,
  indeterminate: boolean,
  label: string
};

export const withMDCToggle = ({ mdcConstructor }: WithMDCToggleOptsT = {}) => (
  Component: React.ComponentType<any>
): React.ComponentType<WithMDCTogglePropsT> => {
  return withMDC({
    mdcConstructor,
    mdcElementRef: true,
    defaultProps: {
      label: undefined,
      id: undefined,
      checked: undefined,
      indeterminate: undefined,
      disabled: false
    },
    onUpdate: (props, nextProps, api) => {
      if (api && nextProps.indeterminate !== api.indeterminate) {
        api.indeterminate = nextProps.indeterminate;
      }
    }
  })(
    class extends React.Component<WithMDCTogglePropsT> {
      generatedId: string;

      componentWillMount() {
        this.generatedId = Date.now() + Math.random() + '';
      }

      render() {
        return <Component {...this.props} generatedId={this.generatedId} />;
      }
    }
  );
};
