using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4WinGame.RESTApi.Services
{
    public class ConnectionService
    {

        public Dictionary<string, string> PlayerIDToConnectionIDlist;
        public List<string> ConnectedIDs;

        public ConnectionService()
        {
            PlayerIDToConnectionIDlist = new Dictionary<string, string>();
            ConnectedIDs = new List<string>();
        }

        public void AddPlayer(string playerID, string connectionID)
        {
            PlayerIDToConnectionIDlist.Add(playerID, connectionID);
            ConnectedIDs.Add(connectionID);
        }

        public void LeavePlayer(string playerID)
        {
            PlayerIDToConnectionIDlist.Remove(playerID);
        }

    }
}
