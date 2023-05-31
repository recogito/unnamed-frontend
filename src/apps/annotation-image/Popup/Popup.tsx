import { 
  OpenSeadragonPopupProps,
  useAnnotationStore,
  useAnnotatorUser
} from '@annotorious/react';

import './Popup.css';

export const Popup = (props: OpenSeadragonPopupProps) => {

  const me = useAnnotatorUser();

  const store = useAnnotationStore();

  // Popup only supports a single selected annotation for now
  const selected = props.selection[0];

  const { creator } = selected.target;

  const comments = selected.bodies
    .filter(b => !b.purpose || b.purpose === 'commenting');

  return (
    <article className="annotation-popup ia-annotation-popup">
      {comments.length === 0 ? (
        <header>
          
        </header>
      ) : (
        <ul>

        </ul>
      )}
    </article>
  )

}