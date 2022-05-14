import React from 'react';
import { UIText } from '../UIText';

const asButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};

type Kind = 'primary' | 'regular';
type Size = 60 | 56 | 44 | 36;

const kinds: { [kind in Kind]: (size: number) => React.CSSProperties } = {
  primary: () => ({
    background: 'var(--actions-default)',
    color: 'white',
  }),
  regular: () => ({
    background: 'var(--white)',
    color: 'var(--black)',
    border: '1px solid var(--neutral-300)',
  }),
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: 'button' | any;
  kind?: Kind;
  size?: Size;
  to?: string;
}

export const Button = React.forwardRef(
  (
    {
      style,
      as = 'button',
      kind = 'primary',
      size = 44,
      children,
      ...props
    }: Props,
    ref
  ) => {
    const Element = as;

    const isButton = as === 'button';
    return (
      <Element
        ref={ref}
        style={Object.assign(
          {
            cursor: 'pointer',
            border: 'none',
            textDecoration: 'none',
            paddingLeft: 48,
            paddingRight: 48,
            borderRadius: 8,
            height: size,
          },
          kinds[kind](size),
          isButton ? undefined : asButtonStyle,
          style
        )}
        {...props}
      >
        <UIText
          style={{ display: 'inline-block', verticalAlign: 'bottom' }}
          kind="button/m_med"
        >
          {children}
        </UIText>
      </Element>
    );
  }
);
