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

const startBot = async () => {
    try {
        // Start the WhatsApp bot
        await amdiWA.start();

        // Wait for the connection to open
        amdiWA.ev.on("open.connection", async () => {
            console.log("Connection opened successfully");

            // Display the QR code for authentication
            await qrDisplayDL();
            await amdiWEB.appObj();
        });

        // Set up event listeners
        amdiWA.ev.on("connection.update", (update) => {
            console.log("Connection Update:", update);
        });

        amdiWA.ev.on("auth.update", (authUpdate) => {
            console.log("Authentication Update:", authUpdate);
        });

        amdiWA.ev.on("messages.upsert", (message) => {
            console.log("New Message:", message);
        });

        amdiWA.ev.on("group.updates", (groupUpdate) => {
            console.log("Group Update:", groupUpdate);
        });

        amdiWA.ev.on("call.manage", (callEvent) => {
            console.log("Call Event:", callEvent);
        });

    } catch (error) {
        console.error("Error starting the bot:", error);
    }
};

// Modify console.info to filter specific logs
const originalConsoleInfo = console.info;
console.info = function (...args) {
    try {
        const message = require("util").format(...args);
        if (!message.includes("SessionEntry")) {
            originalConsoleInfo(...args);
        }
    } catch (error) {
        originalConsoleInfo("Error in log filtering:", error);
    }
};

// Initialize the bot
startBot().catch((error) => {
    console.error("Failed to initialize the bot:", error);
});
