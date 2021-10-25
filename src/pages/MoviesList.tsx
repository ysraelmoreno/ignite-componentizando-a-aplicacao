import { SideBar } from '../components/SideBar';
import { Content } from '../components/Content';

import '../styles/sidebar.scss';
import '../styles/content.scss';

export function MoviesList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar />

      <Content />
    </div>
  )
}
