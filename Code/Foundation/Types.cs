using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Foundation
{
    public enum EnvironmentData
    {
        Developer = 0,
        Testing = 1,
        Production = 2,
        ServicesDB = 3
    }


    public enum DataAction
    {
        Insert = 0,
        Update = 1,
        Select = 2,
        Delete = 3
    }
}
