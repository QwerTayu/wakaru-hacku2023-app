import { useState } from 'react';
import styles from './Content.module.css'

function StatusContent() {
  const members = [
    {
      name: '山田太郎',
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    },
    {
      name: '山田次郎',
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    },
    {
      name: '山田三郎',
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    },
    {
      name: '山田四郎',
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    },
    {
      name: '山田五郎',
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    }
  ];

  return (
    <div className={styles.container}>
      <p className={styles.organizaion}>明石高専</p>
      <div className={styles.members}>
        {members.map((member) => (
          <div key={member.name} className={styles.member}>
            <img src={member.icon} alt="" />
            <p>{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatusContent;
