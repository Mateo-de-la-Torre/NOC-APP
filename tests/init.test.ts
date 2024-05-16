import mongoose from "mongoose";
import { MongoDataBase } from "../src/data/mongos/init";


describe('initMongoDB.ts', () => {

    afterAll (() => {
        mongoose.connection.close();
    })

    it('should connect to MongoDB', async() => {

        const connected = await MongoDataBase.connect({
            mongoUrl: process.env.MONGO_URL!,
        })

        expect(connected).toBe(true);
    });


    it('should throw an error', async() => {
    

        try {
            const connected = await MongoDataBase.connect({
                mongoUrl: 'mongodb://127.0.0.1:270252341/NOC',
            })
            expect(true).toBe(false);
            
        } catch (error) {
            // console.log(error);
            
        }
    });

});