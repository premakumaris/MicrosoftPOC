
  import * as React from "react";
  import styles from "../css/AllMembers.module.scss";
  import {IMember} from "../Interfaces/IMember";
  import {IListItem} from "../Interfaces/IListItem";
 
 
/**
 * THis is used for displaying each item of card
 * @param item card item
 * @param index index value
 */  
  const AllMembers = (
    item: IMember | undefined,
    index: number | undefined
  ): JSX.Element => {
    const Card: React.FunctionComponent<IListItem> = ({ item, index }) => {
     
      if (item === null) {
        return <div>
        </div>;
      } else
        return (
         <div className={styles.card}>
             
         
            <div className={styles.mainTitle}>
            <a className={styles.title} target="_blank"> {item.displayName}</a>
            </div>
          <table>
            <tr>
              <td>
              <p className={styles.content}>
             Email: {item.mail}
            </p>
              </td>
            </tr>
            <tr>
              <td>
              <p className={styles.content}>
            Job Title: {item.jobTitle}
            </p>
              </td>
            </tr>
            <tr>
              <td>
              <p className={styles.content}>
            Office Location: {item.officeLocation}
            </p>
                
              </td>
            </tr>
            <tr>
              <td>
              <p className={styles.content}>
            Preferred Language: {item.preferredLanguage}
            </p>
              </td>
            </tr>
          </table>
                 
           
       </div>
        );
    };
  
    return <Card item={item} index={index} />;
  };
  
  export default AllMembers;
  