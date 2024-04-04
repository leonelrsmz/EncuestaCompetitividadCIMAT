using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Helpers
{
    public static class ReflectionObject
    {
        public static bool ReflectionNotNull(object obj)
        {
            bool response = true;
            Type _type = obj.GetType();

            System.Reflection.PropertyInfo[] propList = _type.GetProperties();

            try
            {
                foreach (System.Reflection.PropertyInfo prop in propList)
                {
                    var p = prop.GetValue(obj, null);
                    if (prop.GetValue(obj, null).Equals(null) || prop.GetValue(obj, null).Equals(""))
                    {
                        response = false;
                    }
                }
            }
            catch (Exception)
            {
                response = false;
            }

            return response;
        }
    }
}
