import AnnounceHandler from './announce-handler';
import { Message } from 'discord.js';
import { EventType } from '../../models/guild';
import EventVariables from '../../modules/announce/event-variables';

export default class MessageDeleteHandler extends AnnounceHandler {
    on = 'messageDelete';
    event = EventType.MessageDeleted;

    async invoke(msg: Message) {
        if (msg?.author && !msg.author.bot)
            await super.announce(msg.guild, [ msg ]);
    }
    
    protected applyEventVariables(content: string, msg: Message) {                
        return new EventVariables(content)
            .guild(msg.guild)
            .memberCount(msg.guild)
            .message(msg)
            .user(msg.author)
            .toString();
    }
}
