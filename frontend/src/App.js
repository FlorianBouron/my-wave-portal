import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { abi as contractABI } from "./utils/WavePortal.json";
import './App.css';

export default function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const [numberOfWaves, setNumberOfWaves] = useState("loading...");
  const [allWaves, setAllWaves] = useState([]);

  const contractAddress = "0xF7BCA7d9C268802D67a3c53ddF85bC71cA0cA751";


  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);        
        const waves = await getAllWaves();
        if(waves && waves.length > 0) {
          setAllWaves(waves);
          setNumberOfWaves(waves.length);
        }
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async (e) => {
    e.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const data = new FormData(e.currentTarget);
        const message = data.get('message');

        const waveTxn = await wavePortalContract.wave(message, { gasLimit: 300000 });
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        const count = await wavePortalContract.getTotalWaves();
        setNumberOfWaves(count.toNumber());

        await getAllWaves();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const waves = await wavePortalContract.getAllWaves();
        
        const wavesCleaned = [];
        waves.forEach(({waver, timestamp, message}) => {
          wavesCleaned.push({
            address: waver,
            timestamp: new Date(timestamp * 1000),
            message
          });
        });

        setAllWaves(wavesCleaned);
        setNumberOfWaves(waves.length);

        wavePortalContract.on("NewWave", (from, timestamp, message) => {
          console.log("NewWave", from, timestamp, message);

          setAllWaves(prevState => [...prevState, {
            address: from,
            timestamp: new Date(timestamp * 1000),
            message: message
          }]);
        });
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          👋 Hey there!
        </div>

        <div className="bio">
          I am Florian and this is my first web3 project!<br/>
          Number total of waves: {numberOfWaves}
        </div>

        {!currentAccount && (
          <Box sx={{ mt: 1 }}>
            <Button 
              variant="contained"      
              fullWidth
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          </Box>
        )}

        {currentAccount && (
          <Box
            component="form"
            sx={{ mt: 1 }}
            noValidate
            autoComplete="off"
            onSubmit={wave}
          >
            <TextField id="message" name="message" fullWidth label="Send A Message" required variant="standard" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Wave at Me
            </Button>
          </Box>
        )}

        {allWaves.map((wave, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}

      </div>
    </div>
  );
}
