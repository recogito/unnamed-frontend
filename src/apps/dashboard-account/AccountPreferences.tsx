import { useState } from 'react';
import TimeAgo from 'timeago-react';
import { useFormik } from 'formik';
import { updateMyProfile } from '@backend/crud/profiles';
import { supabase } from '@backend/supabaseBrowserClient';
import { Toast, ToastContent, ToastProvider } from '@components/Toast';
import type { Translations, MyProfile } from 'src/Types';

import './AccountPreferences.css';

interface AccountPreferencesProps {

  i18n: Translations;

  profile: MyProfile;

}

export const AccountPreferences = (props: AccountPreferencesProps) => {

  const { t } = props.i18n;

  const { profile } = props;

  const [error, setError] = useState<ToastContent | null>(null);

  const formik = useFormik({
    initialValues: {
      nickname: profile.nickname || '',
      first_name: profile.first_name || '',
      last_name: profile.last_name || '',
      avatar_url: profile.avatar_url || ''
    },

    onSubmit: values => {
      updateMyProfile(supabase, values).then(({ error, data }) => {
        if (error) {
          console.error(error);
          setError({ 
            title: t['Something went wrong'], 
            description: t['Could not update your profile information.'], 
            type: 'error' 
          });
        } else {
          setError({ 
            title: t['Profile updated'], 
            type: 'success' 
          });
        }
      });
    }
  });

  return (
    <ToastProvider>
      <div className="dashboard-account-preferences">
        <h1>{t['Your User Profile']}</h1>
        <form onSubmit={formik.handleSubmit}>
          <fieldset>
            <div className="field">
              <label>{t['E-Mail']}</label>
              <input 
                readOnly
                id="email"
                name="email"
                type="text" 
                value={profile.email} />
            </div>
          </fieldset>

          <h2>{t['Public Information']}</h2>
          <span>
            {t['Other users can see this information about you. All fields are optional.']}
          </span>

          <fieldset>
            <div className="field">
              <label htmlFor="nickname">
                {t['Nickname']}
              </label>
              <input 
                id="nickname"
                name="nickname"
                type="text" 
                onChange={formik.handleChange}
                value={formik.values.nickname} />
            </div>

            <div className="field">
              <label htmlFor="first_name">
                {t['First Name']}
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name} />
            </div>

            <div className="field">
              <label htmlFor="last_name">
                {t['Last Name']}
              </label>
              <input
                id="last_name"
                name="last_name"          
                type="text" 
                onChange={formik.handleChange}
                value={formik.values.last_name} />
            </div>

            <div className="field">
              <label htmlFor="avatar_url">
                {t['Avatar URL']}
              </label>
              <input
                id="avatar_url"
                name="avatar_url"          
                type="text" 
                onChange={formik.handleChange}
                value={formik.values.avatar_url} />
            </div>
          </fieldset>

          <button className="primary" type="submit">Submit</button>
        </form>
      </div>

      <Toast
        content={error}
        onOpenChange={open => !open && setError(null)} />
    </ToastProvider>
  )

}