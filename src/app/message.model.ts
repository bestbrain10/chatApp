export interface Message {
    sender : String;
    sender_id : String;
    recipient : String;
    recipient_id : String;
    info: string;
    timestamp? : String;
}