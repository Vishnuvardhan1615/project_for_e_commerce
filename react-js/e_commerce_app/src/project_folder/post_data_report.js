import React, { useEffect,useState } from "react";

function PostDateReport()
{
    const [user_id,setUserId] = React.useState([]);
  
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
       .then((Response) => Response.json())
       .then((data) => {
        setUserId(data)
       })
    }, []);
    return (
        // <div>
        //     {/* <h2>hello vishnu how are</h2> */}
        //     <h1>Data Received</h1>
        //      <ul>
        //     {/* {user_id.map((user) => (
        //         <li key={user.userId}>{user.id} - {user.title} - {user.body}</li>
        //     ))} */}
            
        //       </ul>
        // </div>
        //  <div>
        //     <h1>Data Received</h1>
        //     <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
        //         <thead>
        //             <tr>
        //                 <th>ID</th>
        //                 <th>Title</th>
        //                 <th>Body</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {(() => {
        //                 const rows = [];
        //                 for (let i = 0; i < user_id.length; i++) {
        //                     const user = user_id[i];
        //                     rows.push(
        //                         <tr key={user.id}>
        //                             <td>{user.id}</td>
        //                             <td>{user.title}</td>
        //                             <td>{user.body}</td>
        //                         </tr>
        //                     );
        //                 }
        //                 return rows;
        //             })()}
        //         </tbody>
        //     </table>
        // </div>
       
        <div>
           <h1>Data Received</h1>
           <ul>
              {(() => {
                 const items1 = [];
                 const items = [];
                 let currentHeading = null;
                 for(let i = 0; i < user_id.length; i++) {
                    const user = user_id[i];
                    // Show heading every 10 records
                    if (i % 10 === 0) {
                       items1.push(<span key={`break-${i}`}>{i}<br /></span>);
                       currentHeading = `Group ${(i / 10) + 1} (Records ${i + 1} - ${Math.min(i + 10, user_id.length)})`;
                       items.push(
                         <li key={`heading-${i}`} style={{fontWeight: 'bold', color: 'blue', listStyle: 'none', marginTop: '10px'}}>{currentHeading}</li>
                       );
                    }
                    items.push(
                       <li key={user.id}>{user.userId} - {user.id}</li>
                    );
                 }
                 return items1;
                //  return items;
              })()}
           </ul>

           {(() => {
                 // Get all userIds
                 const allUserIds = user_id.map(user => user.userId);
                 // Get unique userIds
                 const uniqueUserIds = [...new Set(allUserIds)];
                 // Render unique userIds using a for loop
                 const items = [];
                 for(let i = 0; i < uniqueUserIds.length; i++) 
                {
                    items.push(
                       <li key={uniqueUserIds[i]}>{uniqueUserIds[i]}</li>
                    );
                 }
                 return items;
              })()}
        </div>
    )
}

export default PostDateReport;