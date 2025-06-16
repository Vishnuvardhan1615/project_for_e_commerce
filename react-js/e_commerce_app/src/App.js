import React from 'react';
import OtpForm from './project_folder/OtpForm';
import CountIncrease from './project_folder/count_increase';
import UsestateWithName from './project_folder/usesate_with_name';
import EmbeddingExpressions from './project_folder/EmbeddingExpression';

import AttributesAndProps from './project_folder/AttributesAndProps';
import OneParentElement from './project_folder/OneParentElement';
import UserProfile from './project_folder/entry_form';
import Sibling_data from './project_folder/sibling_data';
import Featch_data from './project_folder/featch_data_form';
// import POST_data_from  from './project_folder/post_data_report';
import POST_data_from from './project_folder/post_data_report';
// import MyFileCreate from './project_folder/my_file_create';

function App() {
  return (
    <div className="App">
      <OtpForm />
      <CountIncrease />
      <UsestateWithName />
      <EmbeddingExpressions />
      <AttributesAndProps />
      <OneParentElement />
      <UserProfile />
      <Sibling_data />
      <Featch_data />
      <POST_data_from />
    </div>
  );
}



export default App;


