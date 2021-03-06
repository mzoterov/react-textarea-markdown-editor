import classNames from 'classnames';
import * as React from 'react';
import { useContext, useRef, useState } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import EditorContext from './EditorContext';
import EditorMarker from './EditorMarker';
// @ts-ignore
import arrowIcon from './icon/arrow.svg';
import { IDropdown } from './type';

export interface IEditorMenuDropdownProps {
  className?: string | undefined;
  config: IDropdown;
}

const EditorMenuDropdown: React.FunctionComponent<IEditorMenuDropdownProps> = (props) => {
  const { config } = props;
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const { focus } = useContext(EditorContext);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShow(false);
  });
  return (
    <li
      ref={ref}
      className={classNames('tme-menu-item tme-dropdown', props.className)}
      title={config.markers[index].title}
    >
      <EditorMarker config={config.markers[index]} />
      <span
        className="tme-dropdown-arrow"
        onClick={() => {
          setShow(!show);
          if (!show) {
            focus!();
          }
        }}
      >
        <img alt="" src={arrowIcon} />
      </span>
      <div
        className={classNames('tme-dropdown-content', {
          show,
        })}
      >
        <ul>
          {config.markers.map((marker, i) => (
            <li
              className="tme-menu-item tme-dropdown-item"
              key={marker.key}
              onClick={() => {
                setIndex(i);
                setShow(false);
              }}
              title={marker.title}
            >
              <EditorMarker config={marker} />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default EditorMenuDropdown;
