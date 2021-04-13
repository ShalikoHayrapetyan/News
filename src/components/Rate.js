import React, { useEffect, useState } from 'react';
import { db } from '../App'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import {red, green} from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
         
          display: 'flex',
          flexDirection: "row",
          '& > *': {
            margin: theme.spacing(1),
        },
      },

}));



const Rate = () => {


  const [rateData, setRateData] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [prevRateData, setPrevRateData] = useState()
  const classes = useStyles();
  useEffect(() => {
    fetch('https://cb.am/latest.json.php')
      .then(resp => resp.json())
      .then(resp => {
        setRateData(resp)
        setIsLoaded(true)
      })
      .catch((error) => {
        console.log("error")
      })
  }, [])


  useEffect(() => {
    db.collection("rate")
      .doc("rateStatistic")
      .get()
      .then((doc) => doc.data())
      .then((doc) => {
        setPrevRateData(doc)
      })
      .catch((error) => console.log("no data", error))
  }, [])


  const rateChart = (rate) => {

    if (Number(prevRateData[rate]) > Number(rateData[rate]) || Number(prevRateData[rate]) < Number(rateData[rate])) {
      prevRateData['prev'+rate] = prevRateData[rate]
      prevRateData[rate] = rateData[rate]
      setPrevRateData(prevRateData)
      db.collection("rate").doc("rateStatistic").set(prevRateData)
    }
    if (Number(prevRateData['prev' + rate]) > Number(prevRateData[rate])) {
      return <div key ={rate} className={classes.root}>
        <ArrowDropDownIcon style={{ color: red[500] }}/>
        <p>{`${rate} ${prevRateData[rate]}`}</p>
      </div>
    }
   
    return <div key={rate} className={classes.root}>
      <ArrowDropUpIcon style={{ color: green[500] }}/>
      <p>{`${rate} ${prevRateData[rate]}`}</p>
    </div>
  }

  return (
    <div>
      {isLoaded ? <div className={classes.root}>
        {rateChart('EUR')}
        {rateChart('RUB')}
        {rateChart('USD')}
      </div> : ""
      }
    </div>
  )
}

export default Rate;