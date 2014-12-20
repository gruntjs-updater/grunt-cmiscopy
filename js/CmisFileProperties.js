/* 
 * Factory to create Canonical representation of CMIS document (independent of CMIS dialect)
 */
module.exports = CmisFilePropertiesFactory;

// factory
function CmisFilePropertiesFactory(cmisObject){
    var isModernCmis = cmisObject.succinctProperties != null;
    
    // CmisFileProperties
    return {
        getName: function(){
            return isModernCmis ? cmisObject.succinctProperties["cmis:name"] : cmisObject.object.properties["cmis:name"].value;
        },
        getObjectId: function(){
            return isModernCmis ? cmisObject.succinctProperties["cmis:objectId"] : cmisObject.object.properties["cmis:objectId"].value;
        },
        getMimeType: function(){
            return isModernCmis ? cmisObject.succinctProperties["cmis:contentStreamMimeType"] : cmisObject.object.properties["cmis:contentStreamMimeType"].value;
        },
        getVersion: function(){
            return isModernCmis ? cmisObject.succinctProperties["cmis:versionLabel"] : cmisObject.object.properties["cmis:versionLabel"].value;
        },
        getNodeId: function(){
            return isModernCmis ? cmisObject.succinctProperties["alfcmis:nodeRef"] : cmisObject.object.properties["alfcmis:nodeRef"].value;
        },
        getPath: function(){
            return isModernCmis ? cmisObject.succinctProperties["cmis:path"] : cmisObject.object.properties["cmis:path"].value;
        },
        getType: function(){
            return isModernCmis ? cmisObject.succinctProperties["cmis:baseTypeId"] : cmisObject.object.properties["cmis:baseTypeId"].value;
        },
        isFolder: function(){
            return this.getType() === 'cmis:folder';
        },
        isDocument: function(){
            return this.getType() === 'cmis:document';            
        },
        
        /**
         * Retrieves latest version of this file using appropeiate cmis protocol depending on CMIS dialect
         * 
         * @argument {CmisSession} cmisSession http://agea.github.io/CmisJS/docs/#!/api/CmisSession
         * @return {CmisFileProperties} new object
         */
        getLatestVersion: function(cmisSession, callback){
            return isModernCmis ? getLatestVersionModern(this, cmisSession, callback) : getLatestVersionLegacy(this, cmisSession, callback);
        }
    };
    
    function getLatestVersionModern(self, cmisSession, callback){
        // get new version
        cmisSession.getObject(self.getNodeId()).ok(function(updatedObject) {
            var newVersion = updatedObject.succinctProperties["cmis:versionLabel"];
            callback(null, newVersion);
        }).notOk(function(response) {
            var status = response.statusCode ? response.statusCode : "";
            var error = response.error ? response.error : "";
            callback('failed to get new version: ' + status + "\n" + error);
        });
    }
    
    function getLatestVersionLegacy(self, cmisSession, callback){
        
    }
    
}

