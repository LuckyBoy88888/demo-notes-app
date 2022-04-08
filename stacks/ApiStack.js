import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
    // Public reference to the API
    api;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { table } = props;

        // Create the API
        this.api = new sst.Api(this, "Api", {
            defaultFunctionProps: {
                environment: {
                    TABLE_NAME: table.tableName,
                },
            },
            routes: {
                "GET    /notes/{id}": "src/get.main",
                "POST   /notes": "src/create.main",
            },
        });

        // Allow the API to access the table
        this.api.attachPermissions([table]);

        // Show the API endpoint in the output
        this.addOutputs({
            ApiEndPoint: this.api.url,
        });
    }
}
