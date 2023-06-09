
import { useEffect, useState } from 'react'; 
import { 
  ArrowLineLeft,
  GooglePodcastsLogo, 
  GraduationCap, 
  House, 
  PuzzlePiece, 
  Sliders, 
  UserCircle, 
  UsersThree } from '@phosphor-icons/react';
import { NavItem } from './NavItem';
import type { Project, Translations, UserProfile } from 'src/Types';

import './ProjectSidebar.css';

const setCookie = () => {
  const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
  document.cookie = `x-project-sidebar-collapsed=true; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
}

const clearCookie = () => {
  const expires = new Date(0).toUTCString();
  document.cookie = `x-project-sidebar-collapsed=false; path=/; expires=${expires}; SameSite=Lax; secure`;
}

export interface ProjectSidebarProps {

  active: string;

  i18n: Translations;

  collapsed: boolean;

  project?: Project;

  user?: UserProfile;

}

export const ProjectSidebar = (props: ProjectSidebarProps) => {
  
  const { active } = props;

  const { lang, t } = props.i18n;

  const [open, setOpen] = useState(!props.collapsed);

  useEffect(() => {
    if (open)
      clearCookie();
    else 
      setCookie();
  }, [open]);

  const link = (segment: string = '') => props.project ? 
    `/${lang}/projects/${props.project.id}/${segment}` : undefined;

  return (
    <aside 
      className={open ? 'project-sidebar open' : 'project-sidebar collapsed'}>
      <nav className="project-primary-nav">
        <ul>
          <li>
            <ul>
              <NavItem 
                className="no-hover"
                icon={GooglePodcastsLogo}
                label="INeedAName"
                link={`/${lang}/projects`} />

              <NavItem 
                active={active === 'home'}
                icon={House}
                label={t['Home']}
                link={link()} />
            </ul>

            <ul>
              <NavItem
                active={active === 'collaboration'}
                icon={UsersThree}
                label={t['Collaboration']}
                link={link('collaboration')} />

              <NavItem
                active={active === 'assignments'}
                icon={GraduationCap}
                label={t['Assignments']}
                link={link('assignments')} />

              <NavItem
                active={active === 'addons'}
                icon={PuzzlePiece}
                label={t['Add Ons']}
                link={link('addons')} />

              <NavItem
                active={active === 'settings'}
                icon={Sliders}
                label={t['Settings']}
                link={link('settings')} />
            </ul>
          </li>
        </ul>
      </nav>
      
      <div className="project-sidebar-spacer" />

      <section className="project-sidebar-actions">
        <ul>
          <li className="project-sidebar-toggle project-sidebar-row">
            <button onClick={() => setOpen(!open)}>
              <span className="project-sidebar-col fixed">
                <ArrowLineLeft size={20} />
              </span>
            </button>
          </li>
          <li className="project-sidebar-row">
            <button>
              <span className="project-sidebar-col fixed">
                <UserCircle size={28} weight="light" />
              </span>

              <span className="project-sidebar-col collapsible">
                {props.user?.nickname || ''}
              </span>
            </button>
          </li>
        </ul>
      </section>
    </aside>
  )

}