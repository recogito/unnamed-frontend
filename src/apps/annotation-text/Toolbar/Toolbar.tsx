import { useAnnotationStore, useSelection } from '@annotorious/react';
import { Trash } from '@phosphor-icons/react';
import { PrivacyMode, PrivacySelector } from '@components/PrivacySelector';
import type { Translations } from 'src/Types';

interface ToolbarProps {

  i18n: Translations;

  privacy: PrivacyMode;

  onChangePrivacy(mode: PrivacyMode): void;

}

export const Toolbar = (props: ToolbarProps) => {

  const { selected } = useSelection();

  const store = useAnnotationStore();

  const onDeleteSelection = () => {
    store.bulkDeleteAnnotation(selected);
  }

  return (
    <div className="ta-toolbar-container not-annotatable">
      <div className="ta-toolbar-context ta-toolbar-context-left">
        
      </div>

      <div className="anno-desktop-overlay ta-toolbar">
        <section className="privacy">
          <PrivacySelector 
            mode={props.privacy}
            i18n={props.i18n} 
            onChangeMode={props.onChangePrivacy}/>
        </section>
      </div>

      <div 
        className={selected.length > 0 ? 
          "ta-toolbar-context ta-toolbar-context-right anno-desktop-overlay" :
          "ta-toolbar-context ta-toolbar-context-right anno-desktop-overlay hidden"
        }>
        <button className="delete" onClick={onDeleteSelection}>
          <Trash size={18} />
        </button>
      </div>
    </div>
  )

}