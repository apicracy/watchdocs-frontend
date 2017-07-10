import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import Modals from 'modals/Modals';

const MainLayout = ({ children, params }) => (
  <div>
    { children }
    <Modals params={params} />
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
    />
  </div>
);

MainLayout.propTypes = {
  children: React.PropTypes.object,
  params: React.PropTypes.object,
};

export default MainLayout;
