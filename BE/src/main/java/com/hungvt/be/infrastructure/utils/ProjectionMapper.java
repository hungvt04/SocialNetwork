package com.hungvt.be.infrastructure.utils;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ProjectionMapper {

    public static Map<String, Object> toMap(Object projection) {
        Map<String, Object> map = new HashMap<>();
        Method[] methods = projection.getClass().getMethods();

        for (Method method : methods) {
            if (method.getDeclaringClass() == Object.class) continue;
            if (method.getParameterCount() > 0) continue;
            if (!method.getName().startsWith("get")) continue;

            try {
                String fieldName = method.getName().substring(3);
                fieldName = Character.toLowerCase(fieldName.charAt(0)) + fieldName.substring(1);
                Object value = method.invoke(projection);
                map.put(fieldName, value);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return map;
    }

    public static List<Map<String, Object>> toMapList(List<?> projectionList) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (Object projection : projectionList) {
            list.add(toMap(projection));
        }
        return list;
    }

}
