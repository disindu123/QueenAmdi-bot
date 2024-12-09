/**
░██████╗░██╗░░░██╗███████╗███████╗███╗░░██╗  ░█████╗░███╗░░░███╗██████╗░██╗
██╔═══██╗██║░░░██║██╔════╝██╔════╝████╗░██║  ██╔══██╗████╗░████║██╔══██╗██║
██║██╗██║██║░░░██║█████╗░░█████╗░░██╔██╗██║  ███████║██╔████╔██║██║░░██║██║
╚██████╔╝██║░░░██║██╔══╝░░██╔══╝░░██║╚████║  ██╔══██║██║╚██╔╝██║██║░░██║██║
░╚═██╔═╝░╚██████╔╝███████╗███████╗██║░╚███║  ██║░░██║██║░╚═╝░██║██████╔╝██║
░░░╚═╝░░░░╚═════╝░╚══════╝╚══════╝╚═╝░░╚══╝  ╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═════╝░╚═╝
 __  __       _ _   _       ____             _          
|  \/  |_   _| | |_(_)     |  _ \  _____   _(_) ___ ___ 
| |\/| | | | | | __| |_____| | | |/ _ \ \ / / |/ __/ _ \
| |  | | |_| | | |_| |_____| |_| |  __/\ V /| | (_|  __/
|_|  |_|\__,_|_|\__|_|     |____/ \___| \_/ |_|\___\___|
* @project_name Queen Amdi [WA Multi-device]
* @author BlackAmda <https://github.com/BlackAmda>
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @link <https://github.com/BlackAmda/QueenAmdi>
* @version 4.0.8
* @file  amdiModule.js - QueenAmdi bot module and Web WA connection

© 2022 Black Amda, ANTECH. All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/

/**
const amdiWA = require('queen_amdi_core/dist/amdiCore');
const { qrDisplayDL } = require('queen_amdi_core/dist/qrDisplay');
const amdiWEB = require('queen_amdi_core/qr_code/amdiWEB');

amdiWA.start()

const events = async () => {
    const WASocket = await amdiWA.ev.on("open.connection");

    await qrDisplayDL();
    await amdiWEB.appObj();
    
    amdiWA.ev.on("connection.update", WASocket);
    amdiWA.ev.on("auth.update", WASocket);
    amdiWA.ev.on("messages.upsert", WASocket);
    
    amdiWA.ev.on("group.updates", WASocket);
    amdiWA.ev.on("call.manage", WASocket);
}
events();

const console_info = console.info
console.info = function() {
    if(!require("util").format(...arguments).includes("SessionEntry")){
        return console_info(...arguments)
    }
}
*/

const amdiWA = require('queen_amdi_core/dist/amdiCore');
const { qrDisplayDL } = require('queen_amdi_core/dist/qrDisplay');
const amdiWEB = require('queen_amdi_core/qr_code/amdiWEB');

// Start the WhatsApp bot
amdiWA.start();

const events = async () => {
    try {
        // Wait for the connection to open
        const WASocket = await amdiWA.ev.on("open.connection");

        // Display the QR code for authentication
        await qrDisplayDL();
        await amdiWEB.appObj();

        // Set up event listeners
        amdiWA.ev.on("connection.update", (update) => {
            console.info("Connection Update:", update);
        });

        amdiWA.ev.on("auth.update", (authUpdate) => {
            console.info("Auth Update:", authUpdate);
        });

        amdiWA.ev.on("messages.upsert", (message) => {
            console.info("New Message:", message);
        });

        amdiWA.ev.on("group.updates", (groupUpdate) => {
            console.info("Group Update:", groupUpdate);
        });

        amdiWA.ev.on("call.manage", (call) => {
            console.info("Call Event:", call);
        });

    } catch (error) {
        console.error("Error during event setup:", error);
    }
};

// Initialize event handling
events().catch((error) => {
    console.error("Failed to initialize events:", error);
});

// Modify console.info to filter specific logs
const originalConsoleInfo = console.info;
console.info = function (...args) {
    try {
        const message = require("util").format(...args);
        if (!message.includes("SessionEntry")) {
            originalConsoleInfo(...args);
        }
    } catch (error) {
        originalConsoleInfo("Error filtering log:", error);
    }
};

 
